import { Row, Col, Card, Image, Text } from "@nextui-org/react";
import React from "react";

export default function CharacterProfile({ data }) {
    
  return (
    <>
      <Card isPressable>
        <Card.Body>
          <Row css={{flexDirection:"column"}} justify="center">
            <Col css={{mb:15}}>
              <Image
                src={data.profile_image_url}
                width={150}
                height={150}
                style={{ borderRadius: 100 }}
              />
            </Col>
            <Col>
              <Row wrap="warp" justify="center" style={{flexDirection:"column",textAlign:'center'}}>
                <Col span={12}  >
                  <Text size={28}  >{data.mbti_profile}</Text>
                </Col>

                <Col span={12}>
                  <Text size={15} css={{color:"$gray800"}} >{data.subcategory}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
