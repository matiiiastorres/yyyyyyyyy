import React from 'react';
import TucuWalletCard from './TucuWalletCard';
import { AnimatePresence, motion } from 'framer-motion';

const TucuWallet = ({ data }) => {
  const { name, avatar, bio, links, banner } = data;
  return (
    <>
      <section className="relative">
        <img
          className="w-full absolute h-44 object-cover"
          src={banner}
          alt=""
        />
        <img
          className=" w-32 absolute rounded-full left-1/2 -translate-x-1/2 mt-14 border-8 border-white"
          // className="w-32 h-32 absolute -bottom-16 left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white"
          src={avatar}
          alt=""
        />

        <br />
        <br />
        <br />
        <h2 className="text-center text-lg font-bold pt-28">
          {name ? name : 'No Username'}
        </h2>
        <p className="text-center pb-5">{bio}</p>
        {/* <SocialTree social={social} /> */}
        <div className="flex flex-col justify-center max-w-7xl m-auto md:my-5 w-full md:w-2/5">
          <AnimatePresence>
            {links.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 + 0.5 },
                }}
              >
                <TucuWalletCard
                  title={link.title}
                  url={link.url}
                  image={link.icon}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default TucuWallet;
