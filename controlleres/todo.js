const TodoModel = require("../model/todoSchema");
var bcrypt = require("bcryptjs");
const userModel = require("../model/userSchema");



const TodoController = {
    getTodo: (request,response) => {
        TodoModel.find({}, (error , data) => {
            if(error){
                response.json({
                    message : `Internal Server Error ${error}`,
                    status : false,
                });
            } else     {
                response.json({
                    message : `Successfully Todo Get`,
                    status : true,
                    data : data
                });
            }
        });
    },
    postTodo :(request,response) => {
        const body = request.body;
        console.log(body);
    
        const objToSend = {
            todo : body.todo,
        }
        if(!body.todo){
            response.json({
                message : `Required Field are missing`,
                    status : false,
            });
            return
        }
        TodoModel.create(objToSend , (error , data) => {
            if(error){
                response.json({
                    message : `Internal Server Error ${error}`,
                    status : false,
                });
            }else{
                response.json({
                    message : `Successfully Todo Create`,
                    status : true,
                });
            }
        });
    
    },
    deleteTodo:(request,response) => {
        const { id }= request.params;
       //  console.log(id);
        TodoModel.findByIdAndDelete(id , ( error , data ) =>{
           if(error){
               response.json({
                   message : `Internal Server Error ${error}`,
                   status : false,
               });
           } else     {
               response.json({
                   message : `Successfully Todo Delete`,
                   status : true,
               });
           }
        });
   
   },
   updateTodo:(request,response) => {
    const body = request.body;
    console.log(body);

    const objToSend = {
        todo : body.todo,
    }
    if(!body.todo){
        response.json({
            message : `Required Field are missing`,
                status : false,
        });
        return;
    }
    TodoModel.findByIdAndUpdate(body.id , objToSend, (error , data) => {
        if(error){
            response.json({
                message : `Internal Server Error ${error}`,
                status : false,
            });
        }else{
            response.json({
                message : `Successfully Todo Update`,
                status : true,
            });
        }
    });

}
,
     signup: (request, response) => {
          console.log(request.body);
          const {  email, password } =
            request.body;
          if ( !email || !password ) {
            response.json({
              message: "Required fields are missings",
              status: false,
            });
            return;
          }
          const hashPassword = bcrypt.hashSync(password, 10);
          const objToSend = {
            // first_name: firstName,
            // last_name: lastName,
            email: email,
            password: hashPassword,
            // mobile_number: mobileNumber,
            // dob: dob,
          };
          userModel.findOne({ email: email }, (error, user) => {
            if (error) {
              response.json({
                message: "Internal server error",
                status: false,
              });
            } else {
              console.log(user, "user");
              if (user) {
                response.json({
                  message: "Email Address Already Exists",
                  status: false,
                });
              } else {
                userModel.create(objToSend, (error, user) => {
                  if (error) {
                    response.json({
                      message: "Internal server error",
                      status: false,
                    });
                  } else {
                    response.send({
                      message: "User Successfully Signup",
                      status: true,
                      user,
                    });
                  }
                });
              }
            }
          })
     },
     login:(request, response) => {
          const { email, password } = request.body;
          if (!email, !password) {
            response.json({
              message: "Required fields are missings",
              status: false,
            });
            return;
          }
          userModel.findOne({ email: email }, (error, user) => {
            if (error) {
              response.json({
                message: "Internal server error",
                status: false,
              });
              return;
            } else {
              if (!user) {
                response.json({
                  message: "Credential Error",
                  status: false,
                });
                return;
              } else {
                const comparePassword = bcrypt.compareSync(password, user.password);
                if (comparePassword) {
                  response.json({
                    message: "user Successfully Login",
                    status: true,
                    user,
                  });
                } else {
                  response.json({
                    message: "Credential Error",
                    status: false,
                  });
                }
              }
            }
          });
        },
}
module.exports = TodoController;