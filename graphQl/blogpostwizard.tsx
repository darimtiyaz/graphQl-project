// const BlogPostWizard = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [show, setShow] = useState(false);
//   const [blogTopics, setBlogTopics] = useState([]);
//   const [editStatus, setEditStatus] = useState(false);
//   const [blogData, setBlogData] = useState("");
//   const [checkedValues, setCheckedValues] = useState([]);
//   const [status, setStatus] = useState(false);
//   const [allResults, setallResults] = useState(true);
//   const [allsaveResults, setallsaveResults] = useState(false);
//   const [statusCopy, setStatusCopy] = useState(false);
//   const [verify, setverify] = useState(false);
//   const [content, setContent] = useState(false);
//   const [contentEdited, setContentEdited] = useState(false);
//   const [contentDelete, setContentDelete] = useState(false);
//   const [deleteSingle, setContentDeleteSingle] = useState(false);
//   const [deleteId, setdeleteId] = useState("");
//   const [savedResults, setSavedResults] = useState(false);
//   const [checkArr, setcheckArr] = useState(false);
//   const [spinnerValue, setSpinnerValue] = useState(false);
//   const [imgIcon, setImgIcon] = useState(<img src={usa} width="20px" />);
//   const [imgIconTone, setImgIconTone] = useState("");
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedOptionTone, setSelectedOptionTone] = useState(null);
//   const [data2, setData2] = useState([]);
//   const [selectedOptionTitle, setSelectedOptionTitle] = useState(null);
//   const [showdata, setShowdata] = useState(false);
//   const [routingData, setRoutingData] = useState(false);
//   const [route, setRoute] = useState(false);
//   const [defaultId, setDefaultId] = useState(true);
//   const [currentProject, setCurrentProject] = useState('');
//   const [currentProduct, setCurrentProduct] = useState('');
//   const [currentDescription, setCurrentDescription] = useState('');
//   const [editSubscription, setEditSubscription] = useState(false);
//   const [popup, setPopup] = useState(false);
//   const [textMessage, setTextMessage] = useState(false);
//   const [choosetoneItem, setChoosetoneItem ] = useState(null);
//   const subscriptionData = useSelector((state)=>state.PaymentDetail.data.subscription);
//   const usedWordsData = useSelector((state)=>state.AllProjects.data.totalUsedWords);
//   const [dialog, setDialog] = useState(false);
//   const expireId = localStorage.getItem('checkExpireId');
//   const dispatch = useDispatch();
//   // handle onChange event of the dropdown
//   const projectId = JSON.parse(localStorage.getItem("projectId"));

//   const handleClose = () => (
//     setShow(false), setverify(false), setContent(false)
//   );

//   useEffect(() => {
//     dispatch(getAllProjects())
//       .unwrap()
//       .then((list) => {
//         if(list.status===true){
//           setData2(list?.data);
//           if(defaultId && routingData===false){
//             dispatch(getSelectProjects()).unwrap().then(resp=>{ 
//               setSelectedOptionTitle(resp?.data._id) 
//               formik.setValues({chooseProjectTitle: currentProject?currentProject:resp?.data.projectTitle,
//                 projectName: currentProduct?currentProduct:resp?.data?.productName,
//                 topic:currentDescription?currentDescription:resp?.data?.description,  
//                 language: "English"})
    
//             }) .catch(err=>{
//               console.log("err",err);
//             })
//         }
//           }
//       });
//     const routeUrl = localStorage.getItem("urlRoute");
//     if (routeUrl) {
//       setSpinnerValue(true);
//       setRoute(true)
//       getResults(projectId);
//       dispatch(getProjectDataSingle()).unwrap().then(list=>{
//         if(list.data?.length>0){
//           setRoutingData(true);
//           if(routingData==true){
//             setSelectedOptionTitle(list?.data?.[0]?.searches?.[0]?._id);
//             formik.setValues({
//               chooseProjectTitle:list?.data?.[0].searches?.[0]?.projectTitle,
//               language:list?.data?.[0]?.language,
//               projectName:list?.data?.[0]?.projectName,
//               chooseTone:list?.data?.[0]?.tone,
//               topic: list?.data?.[0]?.description,
    
//             });
            
//            let dat=data.filter((item)=>item.value==list?.data?.[0]?.language)
//            let datt=data1.filter((item)=>item.value==list?.data?.[0]?.tone)
//            setChoosetoneItem(list?.data?.[0]?.tone)
//            setImgIcon(dat?.[0]?.icon)
//            setImgIconTone(datt?.[0]?.icon)
//           }

//         }
//       })
//     }
//   }, [defaultId, routingData,dialog, currentProject]);

//   useEffect(() => {
//     setTimeout(() => {
//       setStatusCopy(false);
//     }, 800);
//   }, [statusCopy]);

//   const getResults = (id) => {
//     setSpinnerValue(true);
//     setallResults(true);
//     setSavedResults(false);
//     setallsaveResults(false);
//     dispatch(
//       getResultsTopics({
//         userId: localStorage.getItem("userId"),
//         type: type,
//         projectId: id,
//       })
//     )
//       .unwrap()
//       .then((list) => {
//         if (list.data.length) {
//           setcheckArr(true);
//           setBlogTopics(list.data);
//           let myVal = document.getElementsByName("check");
//           myVal.forEach((val) => (val.checked = false));
//           setSpinnerValue(false);
//           setShowdata(false)
//         }
//       });
//   };

//   const formik = useFormik({
//     initialValues: {
//       chooseProjectTitle: "",
//       projectName: "",
//       projectName: "",
//       language: "English",
//       chooseTone: "",
//       topic: "",
//     },
//     validationSchema: blogsValidationSchema,

//     onSubmit: (values, { resetForm }) => {
//       dispatch(getExpiredPlan(expireId)).unwrap().then((res)=>{
      
//         if(res.data?.month===1){
//           setPopup(true);
          
//         }else if(res.data.diffInYears===1){
//           setPopup(true);
//         }
//       });
//       if(usedWordsData?.count?.[0]?.count>=subscriptionData?.words){
//         setTextMessage(true);
//         setPopup(true);
//        }else{
//       setShowdata(true)
//       setSpinnerValue(true);
//       dispatch(
//         createProjectTopics({
//           userId: localStorage.getItem("userId"),
//           language: values.language,
//           tone: values.chooseTone,
//           topic: values.topic,
//           type: type,
//           description: values.topic,
//           projectName: values.projectName,
//           projectTypeId: selectedOptionTitle,
//         })
//       )
//         .unwrap()
//         .then((res) => {
//           localStorage.setItem("projectTypeId", res.data.projectTypeId);
//           localStorage.removeItem("urlRoute");
//           //resetForm();
//           //setImgIcon("");
//           //setImgIconTone("");
//           dispatch(updateProjectId(selectedOptionTitle))
//           localStorage.setItem("projectId", JSON.stringify(res.data._id));
//           setallResults(true);
//           setallsaveResults(false);
//           if (res.status===true) {
//             setverify(true);
//             setDefaultId(false);
//             getResults(res.data._id);
//             dispatch(getTotalUsedWords());
//           } else if (res.status === false) {
//             setShow(true);
//             setError(res.msg);
//             setSpinnerValue(false);
//           }
//         })
//         .catch((err) => {
//           setContent(true)
//           console.log(err);
//         });
//       }
//     },
//   });

//   const handleClick = () => {
//     navigate("/app/BlogPostWizard");
//     setContent(false);
//     setSpinnerValue(false);
//   };
//   const SelectMenuButton = (props) => {
//     return (
//         <components.MenuList  {...props}>
//             <Button className="btn btn-primary btn1" onClick={() =>setDialog(true)}><FontAwesomeIcon icon={faPlus} />Create new project</Button>
//             {props.children}
//         </components.MenuList>
//     ) }

//   return (
//     <div className="container login-banner mb-4">
//       <div className="w-100">
//         {spinnerValue && blogTopics <= 0 ? (
//           <div className="spinner">
//             <Spinner
//               prop={
//                 !showdata
//                   ? " "
//                   : "Sit back and relax, we are creating the content for you"
//               }
//             />
//           </div>
//         ) : (
//           <div
//             className={` justify-content-between  ${
//               blogTopics.length > 0 ? "center_div_active" : "center-divv wrap-divv"
//             }`}
//             style={{ display: "flex" }}
//           >
//             {blogTopics.length > 0 ? (
//               ""
//             ) : (
//               <div className="back-btn-div">
//                 <Button
//                   onClick={() => (
//                     navigate("/app/home"),
//                     localStorage.removeItem("projectId"),
//                     localStorage.removeItem("urlRoute")
//                   )}
//                 >
//                   <img src={back} />
//                   <span className="btn-back-img ps-2 align-middle">Back</span>
//                 </Button>
//               </div>
//             )}

//             <form
//               onSubmit={formik.handleSubmit}
//               className={`super_content_blog_form bg-white ${
//                 blogTopics.length > 0 ? "activeClass" : `nonactive-div`
//               }`}
//             >
//               <div className="d-flex text-start flex-column ">
//                 {blogTopics.length > 0 ? (
//                   <div className="back-btn-div">
//                     <Button
//                       onClick={() => {
//                         localStorage.removeItem("projectId") ||
//                         localStorage.removeItem("urlRoute") ||
//                         route
//                           ? navigate("/app/allProjects/contentType")
//                           : setBlogTopics([]);
//                       }}
//                     >
//                       <img src={back} />
//                       <span className="btn-back-img ps-2 align-middle">
//                         Back
//                       </span>
//                     </Button>
//                   </div>
//                 ) : (
//                   ""
//                 )}

//                 <div className="clap-hands pb-2 d-flex align-items-center ">
//                   <h2 className="mb-0 fw-800 fs-16">Blog Post Wizard</h2>
//                   <img src={hello} alt="hello" />
//                 </div>
//                 <p className="mb-0 text-grey fs-12 fw-medium">
//                   Blog ideas generate more website traffic.
//                 </p>
//               </div>

//               {/* Product Title */}
//               <div className="text-start pt-lg-3 pt-2 react_custom_drop">
//                 <label
//                   htmlFor="chooseProjectTitle"
//                   className="mb-2 mt-1 fw-semibold text-dark fs-13"
//                 >
//                   Choose a project title <span className="">*</span>
//                 </label>
//                 <Select components={{ MenuList: SelectMenuButton }}
//                   placeholder={
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <span style={{ marginLeft: 5 }}>
//                         {formik.values.chooseProjectTitle}
//                       </span>
//                     </div>
//                   }
//                   isSearchable={false}
//                   value={selectedOptionTitle}
//                   name="chooseProjectTitle"
//                   options={data2}
//                   onChange={(option) => (
//                     // setSelectedOption(option.projectTitle),
//                     formik.setFieldValue(
//                       "chooseProjectTitle",
//                       option.projectTitle
//                     ),
//                     formik.setFieldValue("projectName", option.productName),
//                     formik.setFieldValue("topic", option.description),
//                     setSelectedOptionTitle(option._id)

//                     //setImgIconTone(option.icon)
//                   )}
//                   //onChange={formik.handleChange}
//                   getOptionLabel={(e) => (
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <span
//                         style={{ marginLeft: 5, fontWeight: 600 }}
//                         key={e.id}
//                       >
//                         {e.projectTitle}
//                       </span>
//                     </div>
//                   )}
//                 />
//                 {formik.touched.chooseProjectTitle &&
//                 formik.errors.chooseProjectTitle ? (
//                   <div className="text-danger fs-13">
//                     {formik.errors.chooseProjectTitle}
//                   </div>
//                 ) : null}
//               </div>

//               <div className="name text-start ">
//                 <label
//                   htmlFor="projectName"
//                   className="mb-2 fw-semibold text-dark fs-13"
//                 >
//                   Product Name <span className="">*</span>
//                 </label>
//                 <input
//                   className="form-control"
//                   id="projectName"
//                   name="projectName"
//                   type="text"
//                   placeholder="Write your project name"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.projectName}
//                 />
//                 {formik.touched.projectName && formik.errors.projectName ? (
//                   <div className="text-danger fs-13">
//                     {formik.errors.projectName}
//                   </div>
//                 ) : null}
//               </div>

//               <div className="text-start pt-lg-3 pt-2">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <label
//                     htmlFor="topic"
//                     className="mb-2 mt-1 fw-semibold text-dark fs-13"
//                   >
//                     Topic <span className="">*</span>
//                   </label>
//                   <p className="fs-12 text-grey mb-0">
//                     {formik.values?.topic?.length?? 0}/100
//                   </p>
//                 </div>
//                 <div className="password_area position-relative">
//                   <textarea
//                     className="form-control"
//                     id="topic"
//                     name="topic"
//                     type="text"
//                     placeholder="Write a sentence you will got an idea"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.topic}
//                     maxLength={100}
//                   ></textarea>
//                 </div>
//                 {formik.touched.topic && formik.errors.topic ? (
//                   <div className="text-danger fs-13">{formik.errors.topic}</div>
//                 ) : null}
//               </div>

//               <div className="text-start pt-lg-3 pt-2 react_custom_drop">
//                 <label
//                   htmlFor="chooseTone"
//                   className="mb-2 mt-1 fw-semibold text-dark fs-13"
//                 >
//                   Choose a tone <span className=""></span>
//                 </label>
//                 <Select
//                   placeholder={
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       {imgIconTone}
//                       <span style={{ marginLeft: 5 }}>
//                         {choosetoneItem?choosetoneItem:formik.values.chooseTone}
//                       </span>
//                     </div>
//                   }
//                   isSearchable={false}
//                   value={selectedOptionTone}
//                   name="chooseTone"
//                   options={data1}
//                   onChange={(option) => (
//                     setChoosetoneItem(null),
//                     formik.setFieldValue("chooseTone", option.value),
//                     setImgIconTone(option.icon)
//                   )}
//                   // onChange={formik.handleChange}
//                   getOptionLabel={(e) => (
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       {e.icon}
//                       <span style={{ marginLeft: 5 }}>{e.text}</span>
//                     </div>
//                   )}
//                 />
//               </div>

              
//               <div className="text-start pt-lg-3 pt-2 react_custom_drop">
//                 <label
//                   htmlFor="language"
//                   className="mb-2 mt-1 fw-semibold text-dark fs-13"
//                 >
//                   Language <span className=""></span>
//                 </label>
//                 <Select
//                   placeholder={
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       {imgIcon}
//                       <span style={{ marginLeft: 5 }}>
//                         {formik.values.language}
//                       </span>
//                     </div>
//                   }
//                   isSearchable={false}
//                   value={selectedOption}
//                   name="language"
//                   options={data}
//                   onChange={(option) => (
//                     formik.setFieldValue("language", option.value),
//                     setImgIcon(option.icon)
//                   )}
//                   // onChange={formik.handleChange}
//                   getOptionLabel={(e) => (
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       {e.icon}
//                       <span style={{ marginLeft: 5 }}>{e.text}</span>
//                     </div>
//                   )}
//                 />
//               </div>

//               <Button
//                 disabled={
//                   formik.values.projectName &&
//                   formik.values.topic &&
                 
//                   !spinnerValue
//                     ? false
//                     : true
//                 }
//                 type="submit"
//                 className="btn btn-primary w-100 form_submit"
//               >
//                 {editStatus ? "Save" : "Generate"}
//               </Button>
//             </form>
//             {
//               <CommonAiResponse
//                 blogTopics={blogTopics}
//                 setBlogTopics={setBlogTopics}
//                 checkArr={checkArr}
//                 setcheckArr={setcheckArr}
//                 getResults={getResults}
//                 type={type}
//                 allResults={allResults}
//                 setallResults={setallResults}
//                 allsaveResults={allsaveResults}
//                 setallsaveResults={setallsaveResults}
//                 savedResults={savedResults}
//                 setSavedResults={setSavedResults}
//                 spinnerValue={spinnerValue}
//                 setSpinnerValue={setSpinnerValue}
//                 showdata={showdata}
//               />
//             }
//           </div>
//         )}
//         {/* <SuccessBlogModel verify={verify} handleClose={handleClose} setverify={setverify} title={"Blog Post Wizard has been Generated"} /> */}
//         <ErrorModal content={content} setContent={setContent} handleClick={handleClick}/>
//         <CommonPopUp popup={popup} setPopup={setPopup} setEditSubscription={setEditSubscription} textMessage={textMessage} setTextMessage={setTextMessage} />
//           <EditSubscription open={editSubscription} setEditSubscription={setEditSubscription} currentPlan={subscriptionData?.Amount}/>
//           <CreateProjectModal dialog={dialog} setDialog={setDialog} getAllProjects={getAllProjects} setCurrentProject={setCurrentProject} setCurrentProduct={setCurrentProduct} setCurrentDescription={setCurrentDescription} />
//       </div>
//     </div>
//   );
// };

// export default BlogPostWizard;