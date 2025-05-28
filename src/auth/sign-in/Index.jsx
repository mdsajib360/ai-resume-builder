import { SignIn } from "@clerk/clerk-react"

function SignInPage() {
  return (
    <>
      <div className="flex justify-center my-20">
          <SignIn/>
    </div>
    </>
  )
}

export default SignInPage