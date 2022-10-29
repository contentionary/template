import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
import Avatar from "@mui/material/Avatar";

import dynamic from "next/dynamic";

import { BasePageProps, CourseModuleInt } from "@src/utils/interface";
import { queryClient, request } from "@src/utils";
import { useRouter } from "next/router";
import Accordion from "@src/components/shared/accordion";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchContents = async ({ queryKey }: { queryKey: Array<any> }) => {
  const [, centreId, id] = queryKey;
  const { data } = await request.get({
    url: `/centre/${centreId}/course/${id}/contents`,
  });
  return data;
};

const ModulesPage = () => {
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { id } = router.query;
  const { isLoading, data, error, refetch } = useQuery(
    ["questions", cachedData.centre.id, id],
    fetchContents,
    {
      initialData: pageData.modules,
    }
  );
  const modules = data as CourseModuleInt[];
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Menu = dynamic(() => import("./courseMenu"));
  const ModuleMenu = dynamic(() => import("./moduleMenu"));
  const ContentMenu = dynamic(() => import("./contentMenu"));
  const [expanded, setExpanded] = useState(0);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: { xs: 5 },
          mb: 5,
        }}
      >
        <Typography
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <ArrowBackIosNewOutlined style={{ marginRight: 10 }} /> Back
        </Typography>
        <Menu
          id={id as string}
          centreId={cachedData.centre.id}
          refetch={refetch}
        />
      </Box>
      {modules.length ? (
        <Box>
          {modules?.map((module, index) => (
            <Accordion
              onClick={() => setExpanded(index)}
              key={`${index}-module`}
              title={
                <Typography variant="h6" component="div">
                  {module.name}
                </Typography>
              }
              expanded={expanded === index}
            >
              <>
                <Typography variant="body2" component="div">
                  {module.description}
                </Typography>
                <Typography style={{ textAlign: "right" }}>
                  <ModuleMenu
                    courseId={id as string}
                    centreId={cachedData.centre.id}
                    module={module}
                    index={index}
                    refetch={refetch}
                  />
                </Typography>
                {module?.contents?.length > 0 && (
                  <Box>
                    <Typography variant="subtitle1" component="div">
                      Contents
                    </Typography>
                    {module.contents.map((content, contentIndex) => (
                      <Box
                        key={`${contentIndex}-content`}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderBottom: "solid 1px #dbdbdb",
                          mt: 2,
                          pb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "#DD782468",
                              width: 24,
                              height: 24,
                              size: 2,
                            }}
                          >
                            {++contentIndex}
                          </Avatar>

                          <Typography
                            variant="body2"
                            component="div"
                            sx={{ marginLeft: 2 }}
                          >
                            {content.name}
                          </Typography>
                        </Box>
                        <ContentMenu
                          courseId={id as string}
                          centreId={cachedData.centre.id}
                          module={content}
                          refetch={refetch}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </>
            </Accordion>
          ))}
        </Box>
      ) : (
        <Empty />
      )}
    </Box>
  );
};

export default ModulesPage;
