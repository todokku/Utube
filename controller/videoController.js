import routes from "../routes";
import Video from "../models/video";

//비디로를 찾기위하여 비동기 작업
export const home = async(req, res) => {
    try{
        const videos = await Video.find({});
        res.render("home", { pageTitle: "Home", videos });
    }catch(e){
        console.log(e);
        res.render("home", { pageTitle: "Home", videos });
    }
};
export const search = (req, res) => {
    //console.log(req.query.term);
    //아래 코드는 query에서 term을 가져 오는 것과 같은 코드이다. 즉 req.query.term와 같은 코드
    //해당 방법이 term = req.query.term 라고 하는 것보다 더 좋은 방식으로 정보를 가져온다.
    const {
        //term을 searchBy로 해준다. 즉 req.query.term === searchBy
        query : {term : searchBy}  
    } = req;
    res.render("search", { pageTitle: "Search", searchBy:searchBy, videos});  
};
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) => {
    const {
        body: {title, description},
        file: {path}
    } = req;
    //비디오 저장 및 업로드
    const newVideo = await Video.create({
        fileUrl :path,
        title: title,
        description: description
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) =>{
    //params를 이용하여 url을 가져올 수 있다. 
    //routes.js에서 const VIDEO_DETAIL = "/:id"; 에서 :id를 해주었기 때문에 
    //콘솔에서는 { id: '5e37e54c1bfb1f603444c78d' } 이런식으로 id의 값이 찍힌다
    // console.log(req.params);
    const {
        params:{id}
    } = req;
    try{
    const video = await Video.findById(id);
    // console.log(video);
    res.render("videoDetail", { pageTitle: "Video Detail",video });
    }
    catch(error){
        console.log(`ERROR ❌ ${error}`);
        res.redirect(routes.home);
    }
}
export const getEditVideo = async(req, res) => {
    const {
        params:{id}
    } = req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `edit ${video.title}`, video });
    } catch(e){
        console.log(`ERROR ❌ ${e}`);
        res.redirect(routes.home);
    }
}

export const postEditVideo = async(req,res) =>{
    const {
        params:{id}
    } = req;
    try{
        await Video.findOneAndUpdate(
            {id},
            {title, description}
        );
        res.redirect(routes.videoDetail(id))
    } catch(e){
        console.log(`ERROR ❌ ${e}`);
        res.redirect(routes.home);
    }

};
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video" });