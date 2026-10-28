* User:

- name -> String - required - minlength:2 - maxlength:20 - trim:true
- email -> String - required - unique:true - lowercase:true - trim:true.
- password -> String - required in the case of a local provider.
- provider -> String - default:local [google,facebook,local]
- isDeleted -> Boolean - default: false [soft-delete]
- isVerified -> Boolean - default: false [email-verification]
- dob -> Date
- gender -> String enum:male,female
- createdAt -> Date
- updatedAt -> Date

--------------------------------

* Message:

- content -> String - required - minlength:1 - maxlength:200 - trim:true
- receiver -> ObjectId - required - ref:User
- sender -> ObjectId - ref:User [optional for anonymous guest messages]
- messageType -> String - required - enum:anonymous,public - default:anonymous
- isDeleted -> Boolean - default:false.
- createdAt -> Date
- updatedAt -> Date

-------------------------------------

* Conversation:

- originalMessage -> ObjectId - required - unique - ref:Message
- sender -> ObjectId - required - ref:User
- receiver -> ObjectId - required - ref:User
- createdAt -> Date
- updatedAt -> Date

* ConversationMessage:

- conversation -> ObjectId - required - ref:Conversation
- sender -> ObjectId - required - ref:User
- content -> String - required - minlength:1 - maxlength:5000 - trim:true
- createdAt -> Date
- updatedAt -> Date

-------------------------------------

* OTP

- code -> String - required - length: 6
- email -> String - required - unique:true - lowercase:true - trim:true
- expiresAt -> Date 2026-09-14T09:30:00.000Z
- createdAt -> Date 2026-09-14T09:15:00.000Z
