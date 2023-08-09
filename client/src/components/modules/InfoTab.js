import { Col, Rate, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import UserList from "./UserList";
const { Title, Text } = Typography;

export default function InfoTab(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  useEffect(() => {
    document.getElementsByClassName("ant-tabs-content")[0].style.height = "100%";
  });
  let rating = String(props.page.rating);
  if (rating.length === 1) {
    rating += ".0";
  }
  //let adminUser = props.users.concat(props.user).find((user) => {
  //  return user.userId === (props.page.adminIds[0] || "");
  //});
  //let admin = adminUser ? adminUser.name.split(" ")[0] : "the group creator";

  const leftHalf = (
    <>
      {props.page.pageType === "Class" ? (
        <React.Fragment>
          {props.page.professor ? <Row>{"Professor: " + props.page.professor}</Row> : <></>}
          <Row>
            {props.page.rating ? (
              <React.Fragment>
                <Rate allowHalf defaultValue={parseFloat(props.page.rating)} disabled count={7} />
                <div style={{ padding: "10px" }}>{rating}/7.0</div>
              </React.Fragment>
            ) : (
              <></>
            )}
            <div style={{ padding: "10px" }}>
              {props.page.in_class_hours
                ? Number(props.page.in_class_hours + props.page.out_of_class_hours).toFixed(1) +
                  " Hours"
                : ""}
            </div>
          </Row>
        </React.Fragment>
      ) : (
        <></>
      )}
      <Row>
        <Text>
          {(props.page.description || "")
            .replace(new RegExp("&nbsp;", "g"), " ")
            .replace(new RegExp("&quot;", "g"), '"')
            .replace(new RegExp("<([^>])*>", "g"), "")}
        </Text>
      </Row>
    </>
  );
  const rightHalf = (
    <UserList
      users={props.users}
      allPages={props.allPages}
      pageIds={props.pageIds}
      page={props.page}
      adminIds={props.page.adminIds}
      isSiteAdmin={props.isSiteAdmin}
      redirectPage={props.redirectPage}
    />
  );
  return isMobile ? (
    <div style={{ height: "100%", overflow: "auto" }}>
      <div style={{ maxHeight: "calc(50% - 20px)", overflow: "auto" }}>{leftHalf}</div>
      <div style={{ paddingTop: "20px" }}>{rightHalf}</div>
    </div>
  ) : (
    <>
      <Row style={{ height: "100%" }} gutter={[16, 16]}>
        <Col span={12} style={{ height: "100%" }}>
          {leftHalf}
        </Col>
        <Col span={12} style={{ height: "100%" }}>
          {rightHalf}
        </Col>
      </Row>
    </>
  );
}
