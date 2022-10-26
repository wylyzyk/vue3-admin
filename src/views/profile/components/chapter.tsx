import { ref, defineComponent } from "vue";
import { watchSwitchLanguage } from "@/utils/i18n";
import { chapter } from "@/api/user";
import { Card, Timeline } from "ant-design-vue";
import type { IChapter } from "@/types/profile";

export default defineComponent(() => {
  const chapterData = ref<IChapter[]>([]);
  const getChapterData = async () => {
    chapterData.value = await chapter();
  };
  getChapterData();
  watchSwitchLanguage(getChapterData);

  return () => (
    <Timeline>
      {chapterData.value?.map((item) => {
        return (
          <Timeline.Item key={item.id}>
            <Card>
              <h6>{item.timestamp}</h6>
              <h4>{item.content}</h4>
            </Card>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
});
