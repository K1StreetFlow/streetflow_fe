// 'use client'
// import { useState } from 'react'
// import { useRouter } from "next/navigation";



// function DeleteCategory(category) {
//    const [modal, setModal] = useState(false);

//    const router = useRouter();

//    async function handleDelete(categoryId) {


//      await fetch(`http://localhost:8000/api/category_products${categoryId}`, {
//       method: 'DELETE',
//      });
//      router.refresh();
//      setModal(false);
//    }

//    function handleChange() {
//     setModal(!modal);

//    }


//   return (
//     <div>

//       <button className='btn btn-primary btn-error btn-sm text-white' onClick={handleChange}>Delete</button>

//     <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle' />

//       <div className="modal ">
//         <div className="modal-box bg-white ">
//           <h3 className="font-bold text-lg text-black" >Kamu yakin ingin menghapus data ini ?</h3>
//             <div className="modal-action">
//               <button type='button' className='btn btn-white text-white' onClick={handleChange}>Close</button>
//               <button type='button' onClick={() => handleDelete(category.id)} className='btn btn-success text-white'>Delete</button>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DeleteCategory
