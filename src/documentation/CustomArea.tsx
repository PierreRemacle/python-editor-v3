import { Box, Divider, List, ListItem, Text } from "@chakra-ui/layout";
import HeadedScrollablePanel from "../common/HeadedScrollablePanel";
import CodeEmbed from "./common/CodeEmbed";
import { DocumentationContextProvider } from "./common/DocumentationContent";
import customBlocks from "./custom/customBlocks";
import { CustomSection } from "./custom/model";

const CustomSectionPanel = ({ section }: { section: CustomSection }) => (
  <Box>
    <Text fontWeight="semibold" fontSize="sm" px={5} pt={4} pb={1} color="gray.600">
      {section.name}
    </Text>
    <List>
      {section.blocks.map((block) => (
        <ListItem key={block.slug}>
          <Box px={5} py={2}>
            <Text fontSize="sm" fontWeight="medium" mb={1}>
              {block.title}
            </Text>
            {block.description && (
              <Text fontSize="xs" color="gray.500" mb={1}>
                {block.description}
              </Text>
            )}
            <DocumentationContextProvider
              parentSlug={block.slug}
              toolkitType="custom"
            >
              <CodeEmbed
                code={block.code}
                parentSlug={block.slug}
                toolkitType="custom"
              />
            </DocumentationContextProvider>
          </Box>
          <Divider />
        </ListItem>
      ))}
    </List>
  </Box>
);

const CustomArea = () => (
  <HeadedScrollablePanel>
    {customBlocks.map((section) => (
      <CustomSectionPanel key={section.slug} section={section} />
    ))}
  </HeadedScrollablePanel>
);

export default CustomArea;
