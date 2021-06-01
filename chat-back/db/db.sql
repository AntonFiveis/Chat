CREATE DATABASE "chat";

CREATE TABLE "Users"(
"userUUID" UUID PRIMARY KEY,
"name" VARCHAR,
"nickname" VARCHAR UNIQUE NOT NULL ,
"email" VARCHAR UNIQUE NOT NULL ,
"phone" VARCHAR UNIQUE NOT NULL ,
"password" VARCHAR,
"salt" VARCHAR,
"photo" VARCHAR
);

CREATE TABLE "RefreshTokens"(
"refreshTokenUUID" UUID PRIMARY KEY,
"userUUID" UUID REFERENCES "Users"("userUUID") ON DELETE CASCADE NOT NULL ,
"fingerprint" VARCHAR NOT NULL,
"expiresIn" BIGINT,
UNIQUE ("userID", "fingerprint")
);

CREATE TABLE "UsersContacts"(
"userContactUUID" UUID PRIMARY KEY,
"userUUID" UUID REFERENCES "Users"("userUUID") ON DELETE CASCADE NOT NULL ,
"friendUserEmail" VARCHAR REFERENCES "Users"("email") ON DELETE CASCADE NOT NULL
);

CREATE TABLE "Chats"(
"chatUUID" UUID PRIMARY KEY,
"isGroup" BOOLEAN,
"chatName" VARCHAR,
"photo" VARCHAR
);
CREATE TABLE "Messages"(
"messageUUID" UUID PRIMARY KEY,
"text" TEXT,
"date" DATE DEFAULT current_date ,
"userUUID" UUID REFERENCES "Users"("userUUID") ON DELETE CASCADE ,
"checked" BOOLEAN,
"photo" VARCHAR
);

CREATE TABLE "ChatMembers"(
"chatMemberID" UUID PRIMARY KEY,
"userUUID" UUID  REFERENCES "Users"("userUUID") ON DELETE CASCADE ,
"chatUUID" UUID REFERENCES "Chats"("chatUUID") ON DELETE CASCADE ,
"lastMessageUUID" UUID REFERENCES "Messages"("messageUUID") ON DELETE CASCADE
);
