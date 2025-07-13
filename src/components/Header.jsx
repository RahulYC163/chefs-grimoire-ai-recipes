import Logo from '../assets/chef.png';

export default function Header() {
  return (
    <header>
      <img src={Logo} />
      <h1>Chef’s Grimoire</h1>
    </header>
  );
}
