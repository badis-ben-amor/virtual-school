// 1 method

// function appendFormData(data: Record<string, any>): FormData {
//   const formData = new FormData();
//   for (const key in data) {
//     if (data[key] !== undefined && data[key] !== null) {
//       if (data[key] instanceof File || data[key] instanceof Blob) {
//         formData.append(key, data[key]);
//       } else {
//         formData.append(key, data[key].toString());
//       }
//     }
//   }
//   return formData;
// }

// using
// const formData = appendFormData(carData:Object);

// 2 method

// const formData = new FormData();
// Object.keys(schoolData).forEach(key => {
//   if (schoolData[key] instanceof File) {
//     formData.append(key, schoolData[key]);
//   } else {
//     formData.append(key, String(schoolData[key]));
//   }
// });
