import "./Header.css";
import { Brand } from "../../utils/uiComponents";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/userSlice";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
import { setIsSearchGpt } from "../../redux/searchGptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const searchGpt = useSelector((store) => store.searchGpt.isSearchGpt);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.error("Unable to sign out", error);
    }
  };

  function handleGoToSearchGPT() {
    dispatch(setIsSearchGpt(!searchGpt));
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand
          wrapperClassName="header-brand"
          nameClassName="header-brand-name"
        />

        <div className="header-actions">
          <button className="netflixgpt-btn" onClick={handleGoToSearchGPT}>
            {searchGpt ? "Homepage" : "Search GPT"}
          </button>
          <button
            className="profile-button"
            type="button"
            aria-label="Open profile"
          >
            <img
              key={user?.photoURL}
              src={
                user
                  ? user?.photoURL
                  : "https://i.pinimg.com/736x/91/86/1b/91861b749841221d52122f0c2933d8a6.jpg"
              }
              alt={user?.displayName || "Profile"}
              referrerPolicy="no-referrer"
            />
            <span className="profile-status" aria-hidden="true" />
          </button>
          <button
            className="signout-button"
            type="button"
            onClick={handleSignOut}
          >
            <span className="signout-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H14" />
                <path d="M11 12h8m0 0-3.5-3.5M19 12l-3.5 3.5" />
              </svg>
            </span>
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
