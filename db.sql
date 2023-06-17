-- CREATE DATABASE testdb; 

-- "user"."user" definition

-- Drop table

-- DROP TABLE "user"."user";

CREATE TABLE "user"."user" (
	"name" varchar NOT NULL,
	"password" varchar NOT NULL,
	"createdAt" timestamp NOT NULL DEFAULT now(),
	"updatedAt" timestamp NOT NULL DEFAULT now(),
	email varchar NOT NULL,
	id serial4 NOT NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
);