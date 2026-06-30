import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "../styles/components/Footer.module.css";

export function Footer() {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.socials}>
          <NavLink to="https://www.facebook.com/" target="_blank">
            <FaFacebook />
          </NavLink>
          <NavLink to="https://www.linkedin.com/" target="_blank">
            <FaLinkedin />
          </NavLink>
          <NavLink to="https://www.instagram.com/libertyfinancebalcarce/" target="_blank">
            <FaInstagram />
          </NavLink>
          <NavLink to="https://www.youtube.com/@LibertyFinanceBalcarce/" target="_blank">
            <FaYoutube />
          </NavLink>
        </div>

        <div className={styles.links}>
          <NavLink to="/terminos-y-condiciones">Términos y condiciones</NavLink>
          <NavLink to="/descargo-de-responsabilidad">
            Descargo de responsabilidad
          </NavLink>
          <NavLink to="/derechos-reservados">Derechos reservados</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </div>
      </footer>
    </div>
  );
}
