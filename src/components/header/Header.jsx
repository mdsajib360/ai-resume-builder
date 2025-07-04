import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from '../../assets/images/logo.png'
function Header() {
  const { user, isSignedIn, isLoaded } = useUser();
  return (
    <div className=" p-3 px-5 flex item-center justify-between shadow-md">
      <Link to="/">
        <img
          src={logo}
          width={50}
          height={100}
          alt="logo"
        />
      </Link>
      {!isSignedIn && isLoaded && (
        <div>
          <Link className="m-2" to="/">
            <Button className="text-white">Home</Button>
          </Link>
          <Link to="/auth/sign-in">
            <Button className="text-white">Get Started</Button>
          </Link>
        </div>
      )}
      {isSignedIn && isLoaded && (
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button className="text-white">Home</Button>
          </Link>
          <Link className="text-white" to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default Header;
