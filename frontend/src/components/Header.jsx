import { useState } from "react";

export default function Header() {
  const [mobileHeaderOpen, setMobileHeaderOpen] = useState(false);

  return(
    <header className="pageHeader">
      <ul className={mobileHeaderOpen ? "headerPageList active" : "headerPageList"}>
        {(mobileHeaderOpen) && (
          <button className="mobileHeaderCloseBtn" onClick={() => {
            setMobileHeaderOpen(false);
          }}></button>
        )}
        <li className="pageListItem">
         <a className="headerLink" href="http://localhost:5080/">Play</a>
        </li>
        <li className="pageListItem">
         <a className="headerLink" href="http://localhost:5080/leaderboard">Leaderboard</a>
        </li>
        <li className="pageListItem">
         <a className="headerLink" href="http://localhost:5080/static/about.html">About</a>
        </li>
      </ul>
      <button className="headerMenuButton" type="button" onClick={() => {
        setMobileHeaderOpen(true);
      }}></button>
    </header>
  );
}