import { Container, Dropdown, Text, Col, User, Row } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import API from "../../API";
import CharacterProfile from "../CharacterProfile";

export default function Home() {
  const [characters, setCharacter] = useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(
    new Set(["0"])
  );
  const [selectedType, setSelectedType] = React.useState(["0"]);

  const selectedCategoryValue = React.useMemo(() => {
    return API.categories.find(
      (category) => category.id == selectedCategory.values().next().value
    ).name;
  }, [selectedCategory]);

  const selectedTypeValue = React.useMemo(() => {
    return API.types.find(
      (type) => type.id == selectedType.values().next().value
    )?.name;
  }, [selectedType]);
  useEffect(() => {
    const categoryId = selectedCategory.values().next().value;
    const typeId = selectedType.values().next().value;
    setCharacter([])
    if (categoryId && typeId != "0") {
      API.fetchData(typeId,categoryId).then((data) => {
        setCharacter(data.profiles);
      }).catch(err=>console.log(err));
    }
  }, [selectedCategory,selectedType]);

  return (
    <Container xl>
      <Row wrap="wrap" justify="center">
        <Col span={12} css={{textAlign:"center"}} >
          <Text size={35}  css={{
          textGradient: "45deg,  $primary 30%,$pink800 70%",
        }}  >Characters Database</Text>
        </Col>
        <Col span={12} css={{ marginBottom: 25 }}>
          <Row justify="space-between" align="center">
          <Col span={6} css={{display:'flex',justifyContent:"flex-start"}}>
              <Dropdown>
                <Dropdown.Button
                  flat
                  color="secondary"
                  css={{ tt: "capitalize" }}
                >
                  {selectedTypeValue}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="secondary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedType}
                  onSelectionChange={setSelectedType}
                >
                  {API.types.map((type) => (
                    <Dropdown.Item
                      key={type.id}
                      value={type.name}
                      label={type.name}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col span={6} css={{display:'flex',justifyContent:"flex-end"}}>
              <Dropdown>
                <Dropdown.Button
                  flat
                  color="secondary"
                  css={{ tt: "capitalize" }}
                >
                  {selectedCategoryValue}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="secondary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedCategory}
                  onSelectionChange={setSelectedCategory}
                >
                  {API.categories.map((category) => (
                    <Dropdown.Item
                      key={category.id}
                      value={category.name}
                      label={category.name}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
        {characters.map((character) => (
          <Col span={12} style={{ marginBottom: 20 }} key={character.id}>
            <CharacterProfile mb={10} data={character} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
