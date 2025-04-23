
// import { getAllApartments, getAllCity, getApartmentByBeds, getApartmentByCity, getApartmentById } from "../api"
// import { ShowApartment } from "./ShowApartment"
// import { useDispatch, useSelector } from "react-redux"
// import { setApartments, setCity } from "../state/Actions"

// export const GetApartments=()=>{

// const apartList = useSelector(s => s.apartments)
// const cityList = useSelector(s => s.cities)
// const [list,setList]=useState()
// const [type,setType]=useState()
// const [type1,setType1]=useState()
// const [type2,setType2]=useState()
// const dis=useDispatch()

// const getAll=()=>{
//   getAllApartments()
//   .then(x=>{
  
//       setList(x.data)
//       return null
//   })
//   .catch(err=>{
//       console.log(err)
//       return null
//   })
//     }

// useEffect(()=>{
//   getAllApartments()
//   .then(x=>{
//   dis(setApartments(x.data))
//   setList(x.data)
//       return null
//   })
//   .catch(err=>{
//       console.log(err)
//       return null
//   })
//  getAllCity()
//   .then(x=>{
//   dis(setCity(x.data))
//       return null
//   })
//   .catch(err=>{
//       console.log(err)
//       return null
//   })
//  },[])

//   const getbyId=(e)=>{
//     e.preventDefault();
//     getApartmentById(e.target.value)
//     .then(x=>{
//         setList(x.data)
      
//     })
//     .catch(err=>{
//         console.log(err)
//     })
//       }
//       const getbyCity=(e)=>{
//         e.preventDefault();
//         console.log("event",e.target.value);
//         getApartmentByCity(e.target.value)
//         .then(x=>{
//             setList(x.data)
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//           }
// const getbyAdvertiser=(e)=>{

// alert("error,\nמצטערים, משהו נכשל☹️⚠️")

// }          
// const getbyNumBeds=()=>{
//  if(!type1)
//   setType1("שווה ל")
//   let x=0
//   type1=="קטו מ"?x=-1:type1=="גדול מ"?x=1:x=0
//   console.log("type1\n",type1,"\ntype2\n",type2,"\nx\n",x);
//    getApartmentByBeds(type2,x)
//     .then(x=>{
//         setList(x.data)
      
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// }   
    
// return<>
// <h1>filters🔍🔎</h1>
// <select onChange={e=>setType(e.target.value)}>
//   <option selected>select all</option>
//   <option>select by id</option>
//   <option>select by city</option>
//   <option>select by category</option>
//   <option>select by advertiser</option>
//   <option>select by number of beds</option>
//   <option>select by price</option>
// </select>

// {type=="select all"  && setList(apartList) }
// {type=="select all"  && setType("")} 
// {type=="select by id" &&
//  <select onChange={(e)=>getbyId(e)}>
//   <option selected>בחר את הקוד הרצוי מתוך הרשימה</option>
//  {apartList&& apartList.map((l)=>(
//    <option key={l._id}>{l._id}</option>
//  ))}
// </select> }

//  {/* עובד רק בשלב שאח"כ*/}
// {type=="select by number of beds" 
// && <input type="number" placeholder="הכנס את מספר המיטות הרצוי"  onChange={(e)=>{setType2(e.target.value);getbyNumBeds()}}></input>}
// {type=="select by number of beds" && <select onChange={(e)=>{setType1(e.target.value); getbyNumBeds()}}>
//   <option selected>בחר סוג</option>
//   <option >שווה ל</option>
//   <option>גדול מ</option>
// <option>קטו מ</option>
// </select>}
// {type=="select by city" &&  <select onChange={(e)=>getbyCity(e)}>
//   <option selected>בחר את העיר הרצויה מתוך הרשימה</option>
//  {cityList&& cityList.map((c)=>(
//    <option value={c._id}>{c.cityName}</option>
//  ))}
// </select> }
// {type=="select by advertiser" &&  <input type="button" value="לא זמין כרגע, נסו מאוחר יותר‼" onClick={(e)=>getbyAdvertiser(e)}></input>}



// {list&&list.map(x=><ShowApartment apartment={x} key={x._id}></ShowApartment>)} 
// </>
// }