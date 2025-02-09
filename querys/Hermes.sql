create database if not exists hermes;

create table if not exists user(
	id BIGINT auto_increment primary key,
	name varchar(250) not null,
	email varchar(250) not null,
	password varchar(250) not null
);

create table if not exists servers(
	id BIGINT auto_increment primary key,
	name varchar(250) not null,
	description text not null,
	user_id BIGINT not null,
	foreign key (user_id) references user(id) on delete cascade
);

create table if not exists channels(
	id BIGINT auto_increment primary key,
	name varchar(250) not null,
	description text not null,
	server_id BIGINT not null,
	foreign key (server_id) references servers(id) on delete cascade
);

create table if not exists chats(
	id BIGINT auto_increment primary key,
	message text not null,
	channel_id BIGINT not null,
	user_id BIGINT not null,
	foreign key (channel_id) references channels(id) on delete cascade,
	foreign key (user_id) references user(id) on delete cascade
);

ALTER TABLE user
ADD COLUMN phone VARCHAR(250) NOT NULL DEFAULT '';
