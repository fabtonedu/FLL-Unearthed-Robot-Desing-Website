import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EngineeringProcess from './components/EngineeringProcess';
import RobotSpecs from './components/RobotSpecs';
import Instructions from './components/Instructions';
import CodeDeepDive from './components/CodeDeepDive';
import PIDControlSection from './components/PIDControlSection';
import Strategy from './components/Strategy';
import DevelopmentApproach from './components/DevelopmentApproach';
import RobotInAction from './components/RobotInAction';
import Evolution from './components/Evolution';
import OpenSource from './components/OpenSource';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-[#F5F5F7] font-sans selection:bg-[#2997FF] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <DevelopmentApproach />
        <RobotSpecs />
        <CodeDeepDive />
        <PIDControlSection />
        <Strategy />
        <EngineeringProcess />
        <Evolution />
        <Instructions />
        <OpenSource />
        <RobotInAction />
      </main>
      <Footer />
    </div>
  );
};

export default App;
