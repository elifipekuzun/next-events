import React, { FormEvent, useRef, useState } from 'react';
import styles from './newsletter-registration.module.css';
import { Data } from '../../pages/api/signup';

export const NewsletterRegistration: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [user, setUser] = useState<string>();

  const registrationHandler = (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current && emailInputRef.current.value;

    if (!email || email.trim() === '' || !email.includes('@')) {
      setIsEmailValid(false);
      return;
    }

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data: Data) => {
        if (data.user) {
          setUser(data.user.email);
        }
      })
      .catch(console.log);
  };

  if (user && user.length) {
    return (
      <section className={styles.newsletter}>
        <h2>Welcome!</h2>
        <h5 className="center">{user}</h5>
      </section>
    );
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};
