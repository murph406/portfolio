import { type To, useNavigate } from "react-router"

export default function useHandleNavigate() {
  const navigate = useNavigate()

  return function handleNavigate(to: To) {
    return function () {
      navigate(to)
    }
  }
}
