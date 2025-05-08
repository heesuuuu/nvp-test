export const Rank = ({ name, type, percent }) => {
    const positionImage = {
        LEFT: "LEFT.png",
        CENTER: "CENTER.png",
        SETTER: "SETTER.png",
        LIBERO: "LIBERO.png",
    };
    const imageFile = positionImage[type.toUpperCase()] || "dafult.png";
    return (
        <div className="ranking-wrapper">
            <div className="position-wrapper">
                <div className="position-img-wrapper">
                    <div className="position">
                        <img src={`/images/Position/${imageFile}`} alt={name} />
                    </div>
                    <div className="position-title">{name}</div>
                </div>

                <div className="state-wrapper">
                    <div
                        className="gauge-wrapper"
                        style={{
                            width: `${percent}%`,
                        }}
                    />
                </div>

                {/* 퍼센트 텍스트 */}
                <div className="percent">{percent}%</div>
            </div>
        </div>
    );
};
