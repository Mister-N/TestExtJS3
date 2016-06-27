--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: auto_id_qualification; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auto_id_qualification
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auto_id_qualification OWNER TO postgres;

--
-- Name: auto_id_users; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auto_id_users
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auto_id_users OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: city; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE city (
    city_id integer NOT NULL,
    name character varying
);


ALTER TABLE public.city OWNER TO postgres;

--
-- Name: city_city_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE city_city_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_city_id_seq OWNER TO postgres;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE groups (
    user_id integer,
    city_id integer
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: qualification; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE qualification (
    qualification_id integer NOT NULL,
    name character varying
);


ALTER TABLE public.qualification OWNER TO postgres;

--
-- Name: qualification_qualification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE qualification_qualification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.qualification_qualification_id_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    user_id integer NOT NULL,
    name character varying,
    qualification_id integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_city; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users_city (
    id integer NOT NULL,
    user_id integer,
    city_id integer
);


ALTER TABLE public.users_city OWNER TO postgres;

--
-- Name: users_city1; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users_city1 (
    user_id integer,
    city_id integer
);


ALTER TABLE public.users_city1 OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: auto_id_qualification; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('auto_id_qualification', 1, true);


--
-- Name: auto_id_users; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('auto_id_users', 4, true);


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY city (city_id, name) FROM stdin;
7	Оренбург
8	Самара
11	Краснодар
12	Ебург
13	Орск
14	Бузулук
15	тест б!
\.


--
-- Name: city_city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('city_city_id_seq', 17, true);


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY groups (user_id, city_id) FROM stdin;
\.


--
-- Data for Name: qualification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY qualification (qualification_id, name) FROM stdin;
1	бла-бла
2	test!
\.


--
-- Name: qualification_qualification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('qualification_qualification_id_seq', 6, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (user_id, name, qualification_id) FROM stdin;
7	тест	1
22	nt	1
23	ффф	4
6	тест!	1
1	name	1
2	test	2
\.


--
-- Data for Name: users_city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users_city (id, user_id, city_id) FROM stdin;
1	1	7
2	1	8
3	2	8
\.


--
-- Data for Name: users_city1; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users_city1 (user_id, city_id) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_seq', 2, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_user_id_seq', 23, true);


--
-- Name: city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY city
    ADD CONSTRAINT city_pkey PRIMARY KEY (city_id);


--
-- Name: qualification_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY qualification
    ADD CONSTRAINT qualification_pkey1 PRIMARY KEY (qualification_id);


--
-- Name: users_city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users_city
    ADD CONSTRAINT users_city_pkey PRIMARY KEY (id);


--
-- Name: users_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey1 PRIMARY KEY (user_id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

