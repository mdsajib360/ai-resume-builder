import { SignIn } from "@clerk/clerk-react"
import Header from "../../components/header/Header"

function SignInPage() {

  return (
    <>
      <Header/>
      <div className="flex justify-center my-20">
          <SignIn/>
    </div>
    </>
  )
}

export default SignInPage