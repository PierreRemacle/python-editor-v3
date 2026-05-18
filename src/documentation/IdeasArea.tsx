import { Box, Divider, List, ListItem, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { RiFolderOpenLine } from "react-icons/ri";
import { useCallback } from "react";
import AreaHeading from "../common/AreaHeading";
import HeadedScrollablePanel from "../common/HeadedScrollablePanel";
import { useProjectActions } from "../project/project-hooks";
import templates, { Template } from "./ideas/templates";

const TemplateItem = ({ template }: { template: Template }) => {
  const projectActions = useProjectActions();

  const handleOpen = useCallback(() => {
    projectActions.openTemplate(template.slug, template.code, template.name);
  }, [projectActions, template]);

  return (
    <Box px={5} py={3}>
      <Text fontSize="sm" fontWeight="semibold" mb={1}>
        {template.name}
      </Text>
      <Text fontSize="xs" color="gray.500" mb={3}>
        {template.description}
      </Text>
      <Button
        size="sm"
        variant="ghost"
        fontWeight="normal"
        color="gray.800"
        bgColor="blimpTeal.100"
        _hover={{ bgColor: "blimpTeal.300" }}
        borderRadius="lg"
        leftIcon={<Box as={RiFolderOpenLine} />}
        onClick={handleOpen}
      >
        Load template
      </Button>
    </Box>
  );
};

const IdeasArea = () => (
  <HeadedScrollablePanel
    heading={
      <AreaHeading
        name="Templates"
        description="Starting points for your LED panel projects."
      />
    }
  >
    <List>
      {templates.map((template) => (
        <ListItem key={template.slug}>
          <TemplateItem template={template} />
          <Divider />
        </ListItem>
      ))}
    </List>
  </HeadedScrollablePanel>
);

export default IdeasArea;
