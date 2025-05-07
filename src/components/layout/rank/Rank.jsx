const Rank = ({ name, percent }) => {
    return (
        <div className="ranking-wrapper">
            <div className="position-wrapper">
                <div className="position-img-wrapper">
                    <div className="position">
                        <img src="/images/Position/LeftRight.png" alt="" />
                    </div>
                    <div className="position-title">{name}</div>
                </div>

                <div className="state-wrapper">
                    <div
                        className="gauge-wrapper"
                        style={{ width: `${percent}%`, backgroundColor: "var(--primary)" }}
                    ></div>
                    <div className="percent">{percent}%</div>
                </div>
            </div>
        </div>
    );
};
