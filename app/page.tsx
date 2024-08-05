"use client";

export default function Home() {
  return (
    <div>
      <div
        tabIndex={0}
        className="collapse collapse-arrow border-base-300 bg-base-200 border"
      >
        <div className="collapse-title text-xl font-medium">
          Focus me to see content
        </div>
        <div className="collapse-content">
          <p>tabindex={0} attribute is necessary to make the div focusable</p>
        </div>
      </div>
    </div>
  );
}
