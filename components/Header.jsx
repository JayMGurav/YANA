
export default function Header() {
  return(
    <header className="header">
      <div className="search">
        <div className="icon">
          <img src="./search.svg" alt="Search Icon" />
        </div>
        <input type="text" placeholder="Search" />
      </div>
    </header>
  )
}