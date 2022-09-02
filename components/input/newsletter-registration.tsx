import React, { FormEvent, useRef, useState, useContext } from 'react';
import styles from './newsletter-registration.module.css';
import { Data } from '../../pages/api/signup';
import { NotificationContext, Props } from '../../store/notification-context';
import { Status } from '../ui/notification';

export const NewsletterRegistration: React.FC = () => {
  const { showNofification } = useContext(NotificationContext) as Props;

  const emailInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<string>();

  const registrationHandler = (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current && emailInputRef.current.value;

    showNofification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: Status.pending,
    });

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
        if (data.message !== 'Success!') {
          return showNofification({
            title: 'Error',
            message: data.message,
            status: Status.error,
          });
        }
        if (data.user) {
          setUser(data.user.email);
          showNofification({
            title: 'Success!',
            message: 'Successfully registered for newsletter.',
            status: Status.success,
          });
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
