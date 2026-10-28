import assert from 'node:assert/strict';
import {once} from 'node:events';
import {after, before, test} from 'node:test';
import cookieParser from 'cookie-parser';
import express from 'express';
import jwt from 'jsonwebtoken';

const testEnvironment = {
    JWT_SECRET: 'cookie-parser-test-secret',
    MONGO_URL: 'mongodb://127.0.0.1:27017/cookie-parser-test',
    SMTP_USER: 'test@example.com',
    SMTP_PASSWORD: 'test-password',
    GOOGLE_WEB_CLIENT_ID: 'test-client-id',
    REDIS_PASSWORD: '',
    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: '6379',
    MAILJET_API_KEY: 'test-api-key',
    MAILJET_API_SECRET: 'test-api-secret',
    MAILJET_FROM_EMAIL: 'test@example.com',
    MAILJET_FROM_NAME: 'Cookie Parser Test',
};

for (const [key, value] of Object.entries(testEnvironment)) {
    if (process.env[key] === undefined) {
        process.env[key] = value;
    }
}

const {guard, optionalGuard} = await import('../src/lib/auth/guard.js');
const app = express();
let server;
let baseUrl;

app.use(cookieParser());
app.all('/parse', (req, res) => {
    res.setHeader('X-Parsed-Cookie', req.cookies.session ?? '');
    res.sendStatus(204);
});
app.post('/protected', guard, (req, res) => {
    res.json({userId: req.user.id});
});
app.post('/optional', optionalGuard, (req, res) => {
    res.json({userId: req.user?.id ?? null});
});
app.use((error, req, res, next) => {
    res.status(error.statusCode ?? 500).json({message: error.message});
});

before(async () => {
    server = app.listen(0, '127.0.0.1');
    await once(server, 'listening');
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    if (server?.listening) {
        await new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
    }
});

test('parses cookies for every supported HTTP method', async () => {
    for (const method of ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
        const response = await fetch(`${baseUrl}/parse`, {
            method,
            headers: {Cookie: 'session=parser-test'},
        });

        assert.equal(response.status, 204, `${method} request should complete`);
        assert.equal(
            response.headers.get('x-parsed-cookie'),
            'parser-test',
            `${method} request should have its cookie parsed`,
        );
    }
});

test('guard reads a valid access token from the parsed cookie on POST', async () => {
    const token = jwt.sign({id: 'test-user'}, process.env.JWT_SECRET);
    const response = await fetch(`${baseUrl}/protected`, {
        method: 'POST',
        headers: {Cookie: `access_token=${token}`},
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {userId: 'test-user'});
});

test('guard rejects a POST without an access-token cookie', async () => {
    const response = await fetch(`${baseUrl}/protected`, {method: 'POST'});

    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), {message: 'no token provided'});
});

test('optionalGuard allows an anonymous POST without an access-token cookie', async () => {
    const response = await fetch(`${baseUrl}/optional`, {method: 'POST'});

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {userId: null});
});

test('optionalGuard attaches the user when a valid access-token cookie is present', async () => {
    const token = jwt.sign({id: 'test-user'}, process.env.JWT_SECRET);
    const response = await fetch(`${baseUrl}/optional`, {
        method: 'POST',
        headers: {Cookie: `access_token=${token}`},
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {userId: 'test-user'});
});
