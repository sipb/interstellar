import React, { Component, useState } from 'react';
import DDQLSection from "./DDQLSection";

export default function DashboardTab(props) {
  
  return (
    <>
      <h3>DashboardTab</h3>
      <DDQLSection 
        dueDates = {props.dueDates}
        quickLinks = {props.quickLinks}
        users = {props.users}
        page = {props.page}
        createNewDDQL = {props.createNewDDQL}
        editDDQL = {props.editDDQL}
        user={props.user}
        type = "DueDate"
      />
    
    </>

  );
};
