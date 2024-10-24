import TempCompo from "./tempCompo"

export default function temp() {
  const fromDate = new Date('2024-10-15')
  const toDate = new Date('2024-10-17')
  console.log(fromDate)
  console.log(toDate)
  return <div>
    {/* {someDate.toString()} */}
  <TempCompo />
  </div>
}