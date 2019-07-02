const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver').v1;
var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
// var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '9933'));
const session = driver.session();
console.log(graphenedbUser);
console.log(graphenedbPass);

const salonGraph = function insertSalon(salon) {
	var cypher = 'CREATE (s:salon) SET s = {salon} RETURN s';
	var params = { salon: salon };
	runSession(cypher, params);
};

const customerGraph = function insertCustomer(customer) {
	var cypher = 'CREATE(c:customer) SET c={customer} RETURN c';
	var params = { customer: customer };
	runSession(cypher, params);
};
const serviceGraph = function insertService(service) {
	// create relationship
	var cypher = 'MATCH(a:salon{salonid:{salonid}),(b:service) SET b={service} MERGE (a)-[r:PROVIDES]-(b) ';
	var params = { salonid: service.salonid, service: service };
	runSession(cypher, params);
};
const runSession = function runSession(cypher, params) {
	session
		.run(cypher, params)
		.then(r => {
			session.close();
			console.log('saved to graph');
		})
		.catch(err => {
			console.log(err);
		});
};

const orderGraph = function insertOrderGraph(order) {
	var cypher = 'MATCH(a:customer{customerid:{customerid}),(b:service{serviceid:{serviceid}})';
	var params = { serviceid: order.serviceid, customerid:customerid };
	runSession(cypher,params)
};

module.exports = {
	insertSalonGraph: salonGraph,
	insertServiceGraph: serviceGraph,
	insertCustomer: customerGraph,
	insertOrders:orderGraph,
};
