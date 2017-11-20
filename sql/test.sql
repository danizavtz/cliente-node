DELETE FROM cliente;
ALTER SEQUENCE cliente_id_seq RESTART WITH 1;
INSERT INTO cliente (id, login, email, phone) VALUES(10,'blabla', 'a@a.com', '8399887766');