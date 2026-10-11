import { mailjet } from "../../../lib/email/init.js";
import { userNotExist } from "../../user/error.js";
import * as userRepository from "../../user/repository/user.repository.js"
import * as messageRepository from "../repository/message.repository.js"
export const sendMessage = async(content, sender , reciever)=>{
    //check if reciever exists
    const user = await userRepository.findUserByID(reciever);
    if(!user) throw userNotExist;
    //send email
    
    try {
        await mailjet.sendMail(
            user.email,
            'Your have received a message',
            `<h1> message</h1> <p>  ${content} </p>`,
        );
    } catch (error) {
        console.warn('Failed to send message email:', error.message || error);
    }

    //create message 
    
    return messageRepository.createMessage(content , sender , reciever);
}