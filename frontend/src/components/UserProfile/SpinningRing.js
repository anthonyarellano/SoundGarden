const SpinningRing = ({identifier}) => {

    return (
        <img
          src={require("../SplashPage/style/splashRing.png")}
          className={identifier === "2" ? 'user-profile-spinning-img-2 modal-img' : "user-profile-spinning-img modal-img"}>
        </img>
    )
};

export default SpinningRing;
