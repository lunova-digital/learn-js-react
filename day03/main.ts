/*
* Error handling
* Promise
* async/await
* fetch
*   - get
*   - post
*   - abort controller
*   - headers
* 
* 
*/

/*

try {
   // sjkdfksdfk
} catch(e) {
  console.log("Error: ", e);
}

*/

/// promise

// const future1 = new Promise((resolve, reject) => {
//   const num = Math.random();
//   if (num > 0.5) {
//     resolve("Swarma");
//   } else {
//     reject("Error in future1");
//   };
// });

// future1.then((result)=>{
//   console.log("Result of future1: ", result);
// }).catch((error)=>{
//   console.log("Error of future1: ", error);
// });





// const future2 = async () => {
//   const num = Math.random();
//   if (num > 0.5) {
//     return "Swarma";
//   } else {
//     throw new Error("Error in future2");
//   }
// }

/// Async await

// async function main() {
//   const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const num = Math.random();
//       if (num > 0.5) {
//         resolve("Swarma");
//       } else {
//         reject("Error in future2");
//       }
//     }, 5000);
//   });


//   // p2.then((result)=>{
//   //   console.log("Result of future1: ", result);
//   // }).catch((error)=>{
//   //   console.log("Error of future1: ", error);
//   // });

//   try {
//     const result = await p2;
//     console.log("Result of future2: ", result);
//   } catch (error) {
//     console.log("Error of future2: ", error);
//   }
//   console.log("End of p2");
// }


// main().then(() => {
//   console.log("End of main");
// }).catch((error) => {
//   console.log("Error of main: ", error);
// });

// console.log("End of file");


/// fetch

const url = "https://jsonplaceholder.typicode.com/posts";


// function main() {
//   fetch(url).then((response) => {

//     response.json().then((data) => {
//       console.log("Data: ", data);
//     }).catch((error) => {
//       console.log("Error: ", error);
//     });

//   }).catch((error) => {
//     console.log("Error: ", error);
//   });
// }



// function main() {
//   fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Data: ", data);
//   }).catch((error) => {
//     console.log("Error: ", error);
//   });
// }




// async function main() {
//   try {

//     const abortController = new AbortController();

//     // abortController.abort();

//     const response = await fetch(url, { signal: abortController.signal }); 

//     const data = await response.json();

//     console.log("Data: ", data);
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// }


const renderData = (data) => {
  const app = document.getElementById("app");
  for (const item of data) {
    const div = document.createElement("div");
    div.innerHTML = `
      <h1>${item.title}</h1>
      <p>${item.body}</p>
    `;
    app?.appendChild(div);
  }
}

async function main() {
  try {

    const response = await fetch(url); 

    const data = await response.json();

    renderData(data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

main();
