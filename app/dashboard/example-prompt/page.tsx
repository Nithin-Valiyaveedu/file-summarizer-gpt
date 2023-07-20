const ExamplePrompt = () => {
  return (
    <div className="w-full p-8 text-justify max-h-[90vh] overflow-y-auto">
      <h1 className="text-xl text-center font-bold my-4">Example Prompts</h1>
      <ul className="font-semibold my-2">
        Prompt that includes the coach&apos;s writing style:
      </ul>
      <li>
        This is a conversation about an executive named Annie and her
        leadership. The two speakers discuss her leadership strengths and areas
        for improvement. Can you write a summary around 600 words on
        Annie&apos;s communication? Please generate a response in a writing
        style similar to the following example: &apos;Stakeholders appreciate
        Annie&apos;s drive to challenge their blind spots and say her
        open-mindedness when seeking to understand a problem is one of her best
        qualities. Stakeholders appreciate Annie&apos;s ability to clearly
        articulate problems and they value the way Annie empowers them and
        allows them the autonomy to be successful.
      </li>
      <ul className="font-semibold my-2">
        Prompts asking for specific quotes or details:
      </ul>
      <li>
        Can you identify important quotes that discuss NAME&apos;S areas of
        improvement?{" "}
      </li>
      <li>
        Can you provide a list of quotes that support the feedback of
        &quot;___&quot; (Aswanth, here are examples to fill in the blank,
        &quot;Your peers and team enjoy working with you and learning from
        you&quot; or &quot;Analytical & Data Driven Decision Maker&quot;){" "}
      </li>
      <li>
        Can you list out specific quotes of suggestions from stakeholders for
        how Annie can improve in the area of &quot;_____&quot;{" "}
      </li>

      <ul className="font-semibold my-2">Prompts asking for themes:</ul>
      <li>
        Could you identify the most discussed themes discussed in these
        transcripts?
      </li>
      <li>
        Based upon stakeholder feedback in the documents, what are the
        executive’s core strengths?
      </li>
      <li>
        Based upon stakeholder feedback in the documents, what are the
        executive’s opportunities for improvement?
      </li>

      <ul className="font-semibold my-2">
        Prompts that ask for &quot;suggestions for improvement.&quot;
      </ul>

      <li>
        Could you write a summary of the areas for improvement in leadership for
        an executive named Annie? Ideally, this summary will highlight how some
        of Annie&apos;s strengths can also be areas for improvement. Please
        write with a friendly and diplomatic writing style.{" "}
      </li>
      <li>
        Could you make a list of suggestions based upon stakeholder feedback for
        how Annie can improve in the area of ______.
      </li>
      <li>
        Can you make a list of the stakeholder feedback that highlights what
        Annie should start doing differently as a leader?{" "}
      </li>
    </div>
  );
};

export default ExamplePrompt;
