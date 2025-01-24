import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox"

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.imageA}
          alt="imageA"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, debitis atque optio accusamus magni dicta sapiente eius dolore autem nemo praesentium. Sed consequatur ipsa voluptatum blanditiis quo nisi nam perferendis.</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet deleniti voluptates, omnis veniam expedita dolores! Velit, assumenda excepturi. Delectus inventore officia voluptas alias porro molestias nostrum fugiat rerum debitis magnam!</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui officia nostrum non dignissimos, praesentium earum quibusdam voluptatum perferendis veniam, vel nihil aperiam magni facilis. Eius laboriosam earum quis sunt tempore.</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-5">
        <div className="border rounded-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam recusandae officia nam, mollitia minus earum, corrupti quas odio est temporibus architecto. Ipsa iure unde voluptatum repellat soluta perferendis enim ipsum.</p>
        </div>
        <div className="border rounded-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam recusandae officia nam, mollitia minus earum, corrupti quas odio est temporibus architecto. Ipsa iure unde voluptatum repellat soluta perferendis enim ipsum.</p>
        </div>
        <div className="border rounded-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam recusandae officia nam, mollitia minus earum, corrupti quas odio est temporibus architecto. Ipsa iure unde voluptatum repellat soluta perferendis enim ipsum.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
