// // categories is the main data structure for the app; it looks like this:

// //  [
// //    { title: "Math",
// //      clues: [
// //        {question: "2+2", answer: 4, showing: null},
// //        {question: "1+1", answer: 2, showing: null}
// //        ...
// //      ],
// //    },
// //    { title: "Literature",
// //      clues: [
// //        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
// //        {question: "Bell Jar Author", answer: "Plath", showing: null},
// //        ...
// //      ],
// //    },
// //    ...
// //  ]


// let categories = [];

// const JSERVICE_API_URL = `http://jservice.io/api`;
// const NUM_CATEGORIES = 2;
// const NUM_QUESTIONS = 1;

// /** Get NUM_CATEGORIES random category from API.
//  *
//  * Returns array of category ids
//  */

// class Category {
    
// static async function getCategoryIds() {
//     let response = await axios.get(`${JSERVICE_API_URL}/categories`, {
//         params: {
//             count: "100",
//             offset: Math.floor(Math.random() * (500 - 1) + 1)
//         }
//     });

//     let randomCategories = _.sampleSize(response.data, NUM_CATEGORIES)

//     let categoryIds = randomCategories.map((catObj) => {
//         return catObj.id;
//     });

//     return categoryIds;
// }

// /** Return object with data about a category:
//  *
//  *  Returns { title: "Math", clues: clue-array }
//  *
//  * Where clue-array is:
//  *   [
//  *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//  *      {question: "Bell Jar Author", answer: "Plath", showing: null},
//  *      ...
//  *   ]
//  */

// // function getCategory(catId) {

// // }

// async getAllCategoriesAndQuestions() {
//     categories = [];
//     let categoryIds = await category.getCategoryIds();
//     for ( let categoryId of categoryIds ) {
//         let fullCategory = await category.getCategory(categoryId);
//         categories.push(fullCategory);
//     }
//     return categories;
// }

// /** Fill the HTML table#jeopardy with the categories & cells for questions.
//  *
//  * - The <thead> should be filled w/a <tr>, and a <td> for each category
//  * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
//  *   each with a question for each category in a <td>
//  *   (initally, just show a "?" where the question/answer would go.)
//  */

// async function fillTable() {
// }

// /** Handle clicking on a clue: show the question or answer.
//  *
//  * Uses .showing property on clue to determine what to show:
//  * - if currently null, show question & set .showing to "question"
//  * - if currently "question", show answer & set .showing to "answer"
//  * - if currently "answer", ignore click
//  * */

// function handleClick(evt) {
// }

// /** Wipe the current Jeopardy board, show the loading spinner,
//  * and update the button used to fetch data.
//  */

// function showLoadingView() {

// }

// /** Remove the loading spinner and 
//  * 3update the button used to fetch data. */

// function hideLoadingView() {
// }

// /** Start game:
//  *
//  * - get random category Ids
//  * - get data for each category
//  * - create HTML table
//  * */

// async function setupAndStart() {
// }

// /** On click of start / restart button, set up game. */

// // TODO

// /** On page load, add event handler for clicking clues */

// // TODO

let categories = [];  // holds all the categories and questions
const BASE_URL = `https://jservice.io/api`;
const QUESTION_COUNT = 5;
const CATEGORY_COUNT = 6;

// ~~~ CATEGORIES AND CLUES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CATEGORIES AND CLUES ~~~~~~~~~~~~~~~~~~~

class Category {
  /** Get NUM_CATEGORIES random category from API.
  * Returns array of category ids
  */
  static async getCategoryIds() {
    let response = await axios.get(`${BASE_URL}/categories`, {
      params: {
        count: "100",
        offset: Math.floor(Math.random() * (500 - 1) + 1) // RNG to vary offset between each request
      }
    });

    // Lodash selects 6 random categories
    let randomCategories = _.sampleSize(response.data, CATEGORY_COUNT)

    // make new array with only the category IDs
    let categoryIds = randomCategories.map((catObj) => {
      return catObj.id;
    });

    return categoryIds;
  }

  // Fill 'categories' array with 6 objects, each with 5 questions
  static async getAllCategoriesAndQuestions() {
    categories = [];
    let categoryIds = await Category.getCategoryIds();
    for ( let categoryId of categoryIds ) {
      let fullCategory = await Category.getCategory(categoryId);
      categories.push(fullCategory);
    }
    return categories;
  }


  /** Return object with data about a category:
   *
   *  Returns {
   *    title: "Math",
   *    clues: clue-array
   *  }
   *
   * Where clue-array is:
   *   [
   *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
   *      {question: "Bell Jar Author", answer: "Plath", showing: null},
   *      ...
   *   ]
   */
  static async getCategory(catId) {
    let response = await axios.get(`${BASE_URL}/clues`, {
      params: {
        category: catId
      }
    });
    // Lodash selects 5 random questions
    let selectFiveQuestions = _.sampleSize(response.data, QUESTION_COUNT);

    // format each question object inside array
    let questionArray = selectFiveQuestions.map((question) => {
      //
      if (question.answer.startsWith('<i>')) {
        question.answer = question.answer.slice(3, -3);
      }
      return {
        question: question.question,
        answer: question.answer,
        showing: null
      }
    });

    let categoryQuestions = {
      title: response.data[0].category.title, // get category title from 'response'
      clues: questionArray
    }
    return categoryQuestions;
  }
}
