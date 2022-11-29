import React from 'react';

const Blog = () => {
    return (
        <div className='my-5'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Q1. What are the different ways to manage a state in a React application?</h3>
                        <p><span>Ans: </span>Every React component has a built-in state. This state is an object which stores the property values that belong to a component. State is able to keep data from different components in-sync because each state update re-renders all relevant components.</p>
                        <p>The built-in way that React provides for setting component states is by using setState() and adding “local state” to a class. There are several other ways to manage state​s in React, including the use of:</p>
                        <ul>
                            <li>Hooks</li>
                            <li>React Context API</li>
                            <li>Apollo Link State</li>
                            <li>Redux</li>
                        </ul>
                    </div>
                    <div className="col-12">
                        <h3>Q2. How does prototypical inheritance work?</h3>
                        <p><span>Ans: </span>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.</p>

                    </div>
                    <div className="col-12">
                        <h3>Q3. What is a unit test? Why should we write unit tests?</h3>
                        <p><span>Ans: </span>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property.</p>
                        <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </div>
                    <div className="col-12">
                        <h3>Q4. React vs. Angular vs. Vue?</h3>
                        <div><span>Ans: </span>
                            <ul>
                                <li>React is now half a decade old and has an outgrown community for support. It has gained worldwide acceptance and is a good choice for front-end development. It is ideal for startups looking to create SPAs.</li>
                                <li>Angular is one of the mature frameworks, having good contributors and ensuring a complete package for app development. On the other side, it requires steep learning and creating watchers to view updates which may put off new app developers. All in all Angular is an ideal option for companies with the requirement for large scale apps.</li>
                                <li>Vue is a young library without any backing from major companies but still considered as a strong competitor for Angular and React. Due to its flexibility and ease of use, it has become a choice of industry giants.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;