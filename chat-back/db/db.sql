
CREATE TABLE "Users"(
"email" VARCHAR PRIMARY KEY,
"name" VARCHAR,
"nickname" VARCHAR NOT NULL,
"phone" VARCHAR NOT NULL,
"password" VARCHAR,
"salt" VARCHAR,
"photo" VARCHAR
);

CREATE TABLE "RefreshTokens"(
"refreshToken" UUID NOT NULL,
"userEmail" VARCHAR REFERENCES "Users"("email") ON DELETE CASCADE  ,
"fingerprint" VARCHAR NOT NULL,
"expiresIn" BIGINT NOT NULL,
PRIMARY KEY ("userEmail", "fingerprint")
);

CREATE TABLE "UsersContacts"(
"userEmail" VARCHAR REFERENCES "Users"("email") ON DELETE CASCADE  ,
"friendUserEmail" VARCHAR REFERENCES "Users"("email") ON DELETE CASCADE,
PRIMARY KEY ("userEmail","friendUserEmail")
);

CREATE TABLE "Chats"(
"chatUUID" UUID PRIMARY KEY ,
"isGroup" BOOLEAN,
"chatName" VARCHAR,
"photo" VARCHAR,
"ownerEmail" VARCHAR NOT NULL REFERENCES "Users"("email") ON DELETE CASCADE
);
CREATE TABLE "Messages"(
"messagesUUID" UUID PRIMARY KEY,
"text" TEXT,
"date" timestamp NOT NULL DEFAULT localtimestamp ,
"userEmail" VARCHAR NOT NULL REFERENCES "Users"("email") ON DELETE CASCADE  ,
"chatUUID" UUID NOT NULL REFERENCES "Chats"("chatUUID") ON DELETE CASCADE,
"checked" BOOLEAN,
"photo" VARCHAR
);


CREATE TABLE "ChatMembers"(
"userEmail" VARCHAR NOT NULL REFERENCES "Users"("email") ON DELETE CASCADE  ,
"chatUUID" UUID NOT NULL REFERENCES "Chats"("chatUUID") ON DELETE CASCADE ,
"lastMessageUUID" UUID REFERENCES "Messages"("messageUUID") ON DELETE CASCADE,
PRIMARY KEY ("userEmail", "chatUUID")
);
