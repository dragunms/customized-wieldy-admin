import React, {useEffect} from 'react';
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import {useDispatch, useSelector} from 'react-redux';

import Widget from 'src/components/Widget';

const PieChartWidget = ({title, reducer, action}) => {
    const selector = useSelector((state) => state[reducer]);
    const dispatch = useDispatch();

    const data = [
        {name: 'Normal', value: 58},
        {name: 'Height', value: 20},
    ];

    const COLORS = ['#5797fc', '#f5222d'];

    useEffect(() => {
        dispatch(action.list());
        return function cleanup() {
            dispatch(action.clear());
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {selector.data && (
                <Widget title={<h2 className='h4 gx-text-capitalize gx-mb-0'>{title}</h2>} styleName='gx-text-center'>
                    <div className='gx-py-3'>
                        <ResponsiveContainer width='100%' minWidth={150} height={150}>
                            <PieChart>
                                <Tooltip />
                                <text x='50%' className='h1' y='50%' textAnchor='middle' dominantBaseline='middle'>
                                    {selector.data.totalDocs}
                                </text>
                                <Pie
                                    data={data}
                                    dataKey='value'
                                    cx='50%'
                                    cy='50%'
                                    innerRadius={47}
                                    outerRadius={57}
                                    fill='#8884d8'
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={index.toString()} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Widget>
            )}
        </>
    );
};
export default PieChartWidget;
