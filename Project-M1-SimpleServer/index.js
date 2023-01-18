const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');

// Read data from file
// Template
const tempCourse = fs.readFileSync(
   // `${__dirname}/data/data.txt`,
   `${__dirname}/data/data.json`,
   'utf-8'
);

// Template
const tempHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse-1.html`,
    'utf-8'
 );
 
//function replaceTemplate(htmlStr, course){
// const replaceTemplate = (htmlStr, course)=>{  //fat arrow function or lambda
//     let output = htmlStr.replace(/{%NAME%}/g, course.courseName);
//     output = output.replace(/{%IMAGE%}/g, course.image);
//     output = output.replace(/{%DEPT%}/g, course.dept);
//     output = output.replace(/{%INSTRUCTOR%}/g, course.instructor);
//     output = output.replace(/{%CREDITS%}/g, course.credits);
//     output = output.replace(/{%DESCRIPTION%}/g, course.description);
//     output = output.replace(/{%ID%}/g, course.id);
//     return output;
// }

const dataObj = JSON.parse(tempCourse);

//////////////////////////////////
// Create Server 
//const server = httpServer.createServer(function(req, res) { //call back function
const server = httpServer.createServer((req, res) => {  
    // const urlParameter = url.parse(req.url, true);
    // console.log(urlParameter.query);
    // console.log(urlParameter.pathname);
    // console.log(JSON.stringify(urlParameter.query)); //convert to string
    // console.log(JSON.stringify(urlParameter.pathname)); //convert to string

    const {query, pathname} = url.parse(req.url, true); // object destructors
    
    //if(urlParameter.query.id){ // if there is a query parameter named id
    if(query.id){ // if there is a query parameter named id
    // Courses page
        //if (urlParameter.pathname === '/' || urlParameter.pathname.toLowerCase() === '/courses') {
        if (pathname === '/' || pathname.toLowerCase() === '/courses') {
            res.writeHead(200, { //everything ran successfully
               'Content-type': 'text/html'
            });
            //const course = dataObj[Number(urlParameter.query.id)]; //convert string to numeric value
            const course = dataObj[Number(query.id)]; //convert string to numeric value
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(tempHTMLCourse, course); //function that will replace course values in html

            //res.end(`we received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
            //${JSON.stringify(course)}` ) //convert object back to string
            res.end(courseHTML);
        }
        else{
            res.writeHead(404, { //server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end('resource not found')
        
        }    
    }   
});

//start listening to requests
//server.listen(8001, 'localhost', function() {
server.listen(8001, 'localhost', () => {
    console.log('Listening to requests on port 8001');
});