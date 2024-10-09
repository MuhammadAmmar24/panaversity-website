"use server"
import React, { Suspense, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { allTeamMembers } from "@/src/constants/teams";
import CardSkeleton from "@/src/components/ui/skeletons/CardSkeleton";
import TeamMemberClient from "@/src/components/team/TeamMemberClient";

const TeamMember = () => {
  return (
    <TeamMemberClient/>
  );
};



export default TeamMember;

