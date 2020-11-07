import React from "react"
import { Link as GatsbyLink } from "gatsby"
import language_config from "../../i18n/language-config"
import { useTranslation } from "react-i18next"

export const Link = ({ to, language, ...props }) => {
  // If it's the default language, don't do anything
  // If it's another language, add the "path"
  const { i18n } = useTranslation()
  const { is_default, path } = language_config[i18n.language]
  const path_to = is_default ? to : `/${path}/${to}`

  return <GatsbyLink {...props} to={path_to} />
}
