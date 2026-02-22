import { motion } from "framer-motion"
import styles from "./Badge.module.css"

interface BadgeProps {
  label: string
  logo?: React.ReactNode
  color?: string // background color
  textColor?: string
  className?: string
}

export function Badge({
  label,
  logo,
  color = "#1f2937", // default dark gray
  textColor = "#ffffff",
  className = "",
}: BadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${styles.badge} ${className}`}
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {logo && (
        <span className={styles.badgeLogo}>
          {logo}
        </span>
      )}
      {label}
    </motion.span>
  )
}