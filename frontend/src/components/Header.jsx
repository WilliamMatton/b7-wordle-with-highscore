export default function Header() {
  return(
    <header className="pageHeader">
      <ul className="headerPageList">
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
    </header>
  );
}