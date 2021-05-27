CREATE DATABASE "chat";

CREATE TABLE "Users"(
"userID" UUID PRIMARY KEY,
"name" VARCHAR,
"nickname" VARCHAR UNIQUE,
"phone" VARCHAR UNIQUE ,
"password" VARCHAR,
"salt" VARCHAR,
"photo" VARCHAR
);

CREATE TABLE "RefreshTokens"(
"refreshToken" UUID PRIMARY KEY,
"userID" UUID REFERENCES "Users"("userID") ON DELETE CASCADE,
"fingerprint" VARCHAR,
"expiresIn" BIGINT,
UNIQUE ("userID", "fingerprint")
);

CREATE TABLE "UsersContacts"(
"userContactID" UUID PRIMARY KEY,
"userID" UUID REFERENCES "Users"("userID") ON DELETE CASCADE,
"friendUserID" UUID REFERENCES "Users"("userID") ON DELETE CASCADE
);

CREATE TABLE "Chats"(
"chatID" UUID PRIMARY KEY,
"isGroup" BOOLEAN,
"chatName" VARCHAR,
"photo" VARCHAR
);
CREATE TABLE "Messages"(
"messageID" UUID PRIMARY KEY,
"text" TEXT,
"date" DATE DEFAULT current_date ,
"userID" UUID REFERENCES "Users"("userID") ON DELETE CASCADE ,
"checked" BOOLEAN,
"photo" VARCHAR
);

CREATE TABLE "ChatMembers"(
"chatMemberID" UUID PRIMARY KEY,
"userID" UUID  REFERENCES "Users"("userID") ON DELETE CASCADE ,
"chatID" UUID REFERENCES "Chats"("chatID") ON DELETE CASCADE ,
"lastMessageID" UUID REFERENCES "Messages"("messageID") ON DELETE CASCADE
);
