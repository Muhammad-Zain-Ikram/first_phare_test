import { useTranslation } from "react-i18next"

function App() {
  const {t} = useTranslation();

  return (
    <>
    <h1 className='text-red-500'>Hello Project</h1>
    <h2>{t("title")}</h2>
    <p>{t("description.part1")}</p>
    <p>{t("description.part2")}</p>
    </>
  )
}

export default App
